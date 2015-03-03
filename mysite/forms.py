from django import forms
from django.conf import settings
from django.core.mail import send_mail

class ContactForm(forms.Form):
    your_name = forms.CharField()
    your_email = forms.EmailField()
    subject = forms.CharField()
    message = forms.CharField(widget=forms.Textarea)
    
    def send_email(self):
        subject = form.cleaned_data['subject'],
        message = form.cleaned_data[message]+"\n\n sender: " + form.cleaned_data[your_name] + " " + form.cleaned_data[your_email]
        from_address = settings.EMAIL_HOST_USER
        print (subject, message, from_address)
        send_mail(subject, 
                  message,
                  from_address, 
                  ['leo.van.nierop@gmail.com'], 
                  fail_silently=False)
        
        #do this later