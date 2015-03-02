from django.conf.urls import patterns, url

from sky_alchemy import views

#the $ signs indicate end of string, so important to include
#to make sure that the 1st one doesnt just match everything.
#the (?P<name>\d+) matches a number (1 or more digits), and stores
#them in the variable name.
urlpatterns = patterns('',
    url(r'^$', views.index, name='index'),
    url(r'^ingredients$', views.ingredients, name='ingredients'),
)