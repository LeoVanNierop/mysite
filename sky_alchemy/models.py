from django.db import models

# Create your models here.



class Effect(models.Model):
    name = models.CharField(max_length=100, unique=True) #add uniqueness
    base_cost = models.FloatField()
    base_magnitude = models.FloatField()
    base_Duration = models.FloatField()
    
    def __unicode__(self):
        return self.name
        
    class Meta:
        ordering = ["name"]

        
class Ingredient(models.Model):
    name = models.CharField(max_length=100, unique=True)
    effect1 = models.ForeignKey(Effect, related_name='effect1')
    effect2 = models.ForeignKey(Effect, related_name='effect2')
    effect3 = models.ForeignKey(Effect, related_name='effect3')
    effect4 = models.ForeignKey(Effect, related_name='effect4')
    cost = models.FloatField()
    weight = models.FloatField()
            
    def __unicode__(self):
        return self.name
        
    class Meta:
        ordering = ["name"]