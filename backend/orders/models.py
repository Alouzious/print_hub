from django.db import models

# Create your models here.
from django.db import models
from django.conf import settings

class Order(models.Model):
    STATUS_CHOICES = (
        ('pending', 'Pending'),
        ('paid', 'Paid'),
        ('printing', 'Printing'),
        ('ready', 'Ready for Pickup'),
        ('collected', 'Collected'),
    )
    
    client = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    station = models.ForeignKey('stations.Station', on_delete=models.SET_NULL, null=True)
    file = models.FileField(upload_to='print_files/')
    file_name = models.CharField(max_length=255)
    page_count = models.IntegerField()
    is_color = models.BooleanField(default=False)
    is_double_sided = models.BooleanField(default=False)
    
    # Pricing (UGX 200 per page base. Let's add 100 for color)
    total_price = models.IntegerField(default=0) 
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')
    created_at = models.DateTimeField(auto_now_add=True)

    def calculate_price(self):
        base_price = 200
        if self.is_color:
            base_price += 100
        self.total_price = base_price * self.page_count
        return self.total_price

    def save(self, *args, **kwargs):
        self.calculate_price()
        super().save(*args, **kwargs)

    def __str__(self):
        return f"Order #{self.id} by {self.client.username}"