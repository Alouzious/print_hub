from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.views import APIView
from django.conf import settings
import requests
from .models import Order
from .serializers import OrderSerializer
from stations.models import Station

# 1. Create Order (Client uploads file)
class OrderCreateView(generics.CreateAPIView):
    serializer_class = OrderSerializer
    permission_classes = []  # For MVP, allow anyone (we'll add auth later)

    def perform_create(self, serializer):
        from django.contrib.auth import get_user_model
        User = get_user_model()
        
        # Option 1: For MVP - get user from request data if provided
        client_id = self.request.data.get('client_id')
        if client_id:
            try:
                client = User.objects.get(id=client_id)
            except User.DoesNotExist:
                client = User.objects.first()
        else:
            # Fallback to first user
            client = User.objects.first()
        
        serializer.save(client=client)

# 2. Verify Payment (Called by frontend after Flutterwave success)
class VerifyPaymentView(APIView):
    def post(self, request):
        transaction_id = request.data.get('transaction_id')
        order_id = request.data.get('order_id')
        
        if not transaction_id or not order_id:
            return Response({"error": "Missing data"}, status=status.HTTP_400_BAD_REQUEST)

        url = f"https://api.flutterwave.com/v3/transactions/{transaction_id}/verify"
        headers = {
            "Authorization": f"Bearer {settings.FLUTTERWAVE_SECRET_KEY}",
            "Content-Type": "application/json"
        }
        
        try:
            response = requests.get(url, headers=headers)
            data = response.json()
            
            if data.get('status') == 'success' and data['data']['status'] == 'successful':
                order = Order.objects.get(id=order_id)
                order.status = 'paid'
                order.save()
                return Response({"message": "Payment verified", "order_status": order.status})
            else:
                return Response({"error": "Payment verification failed"}, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

# 3. Admin Dashboard (View all orders)
class AdminOrderListView(generics.ListAPIView):
    serializer_class = OrderSerializer
    queryset = Order.objects.all().order_by('-created_at')

# 4. Agent Dashboard (View orders for a specific station)
class AgentOrderListView(generics.ListAPIView):
    serializer_class = OrderSerializer

    def get_queryset(self):
        station_id = self.kwargs['station_id']
        return Order.objects.filter(station_id=station_id, status__in=['paid', 'printing', 'ready']).order_by('-created_at')

# 5. Update Order Status (NEW - for Week 3)
class OrderStatusUpdateView(generics.UpdateAPIView):
    serializer_class = OrderSerializer
    permission_classes = []

    def get_object(self):
        return Order.objects.get(pk=self.kwargs['pk'])

    def patch(self, request, *args, **kwargs):
        order = self.get_object()
        new_status = request.data.get('status')
        
        valid_statuses = ['pending', 'paid', 'printing', 'ready', 'collected']
        if new_status not in valid_statuses:
            return Response({"error": "Invalid status"}, status=status.HTTP_400_BAD_REQUEST)
            
        order.status = new_status
        order.save()
        
        return Response(OrderSerializer(order).data)