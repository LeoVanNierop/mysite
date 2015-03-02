from django import forms

class ContactForm(forms.Form):
    your_name = forms.CharField()
    your_email = forms.EmailField(required=False)
    message = forms.CharField(widget=forms.Textarea)
    
    def send_email(self):
        pass
        #do this later