from django.db import models

# Create your models here.
from django.db import models

class Station(models.Model):
    name = models.CharField(max_length=100) # e.g., "Main Campus"
    location_description = models.TextField(blank=True)
    
    def __str__(self):
        return self.name