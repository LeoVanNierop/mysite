from django.shortcuts import render
from django.core import serializers
from django.http import HttpResponse
import json

from sky_alchemy.models import Effect, Ingredient
# Create your views here.



def index(request):
    #retrieve list of ingredients
    #and display it with some form 
    #elements 
    return render(request, 'sky_alchemy/index.html')
    
def ingredients(request):
    all_ingredients = Ingredient.objects.all()
    datalist = []
    for ingredient in all_ingredients:
        datalist.append({"name": ingredient.name, "effects": [ingredient.effect1.name, ingredient.effect2.name, ingredient.effect3.name, ingredient.effect4.name]})
    data = json.dumps(datalist)
    return HttpResponse(data, content_type="application/json")