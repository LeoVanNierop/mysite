from django import forms
from django.conf import settings
from django.core.mail import send_mail

class ContactForm(forms.Form):
    your_name = forms.CharField()
    your_email = forms.EmailField()
    subject = forms.CharField()
    message = forms.CharField(widget=forms.Textarea)
    
    def send_email(self):
        try:
            subject = this.cleaned_data.get('subject')
            message = this.cleaned_data.get('message')+"\n\n sender: " + this.cleaned_data.get('your_name') + " " + this.cleaned_data.get('your_email')
            from_address = settings.EMAIL_HOST_USER
            print (subject, message, from_address)
        except Exception,e:
            print str(e)
        try:
            send_mail(subject, 
                      message,
                      from_address, 
                      ['leo.van.nierop@gmail.com'], 
                      fail_silently=False)
        except Exception, e:
            print str(e)
        #do this later