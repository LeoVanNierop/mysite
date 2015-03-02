from django.conf.urls import patterns, include, url
from django.contrib import admin
import mysite.views 
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = patterns('',
    # Examples:
    # url(r'^$', 'mysite.views.home', name='home'),
    # url(r'^blog/', include('blog.urls')),
    url(r'^$', 'mysite.views.home', name='home'),
    url(r'^contact/$', mysite.views.ContactView.as_view(), name='contact'),
    url(r'^contact/thanks$', 'mysite.views.thanks', name='contactthanks'),
    url(r'^admin/', include(admin.site.urls)),
    url(r'^skyrim/', include('sky_alchemy.urls', namespace='skyrim')),
) + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
