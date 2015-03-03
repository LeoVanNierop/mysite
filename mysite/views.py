from django.shortcuts import render
from .forms import ContactForm
from django.views.generic.edit import FormView

def home(request):
    print ("blahblah")
    return render(request, "mysite/base.html")
 
def thanks(request):
    return render(request, "mysite/thanks.html")
 
class ContactView(FormView):
    template_name = "mysite/contact.html"
    form_class = ContactForm
    success_url = "/contact/thanks"
    
    def form_valid(self, form):
        form.send_email()
        return super(ContactView, self).form_valid(form)