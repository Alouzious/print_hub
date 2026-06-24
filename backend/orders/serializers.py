from rest_framework import serializers
from .models import Order

class OrderSerializer(serializers.ModelSerializer):
    station_name = serializers.CharField(source='station.name', read_only=True)
    client_name = serializers.CharField(source='client.username', read_only=True)

    class Meta:
        model = Order
        fields = ['id', 'client', 'client_name', 'station', 'station_name', 'file', 'file_name', 
                  'page_count', 'is_color', 'is_double_sided', 'total_price', 'status', 'created_at']
        read_only_fields = ['total_price', 'status', 'client']