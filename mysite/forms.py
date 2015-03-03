from django import forms
from django.core.mail import send_mail

class ContactForm(forms.Form):
    your_name = forms.CharField()
    your_email = forms.EmailField()
    subject = forms.CharField()
    message = forms.CharField(widget=forms.Textarea)
    
    def send_email(self):
        send_mail(form.cleaned_data['subject'], 
                  form.cleaned_data[message]+"\n\n sender: " + form.cleaned_data[your_name],
                  form.cleaned_data[your_email], 
                  ['leo.van.nierop@gmail.com'], 
                  fail_silently=False)
        
        #do this later