from django.shortcuts import render

# views.py
from django.http import JsonResponse
from .models import Customer

def index(request):
    
    # # Update receiver's balance
    # receiver = Customer.objects.get(CustomerID=1)
    # receiver.AccountBalance = 5000
    # receiver.save()

    return render(request,'index.html')


def get_data(request):
    data = Customer.objects.all().values()
    return JsonResponse(list(data), safe=False)



from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .models import Customer  # Import your Customer model
import json  # Import the json module


@csrf_exempt  # This decorator is used to bypass CSRF protection for simplicity
def transfer_view(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body.decode('utf-8'))

            # Extract data from the request
            sender_id = data.get('senderID')
            receiver_id = data.get('receiverID')
            amount = data.get('amount')
            sender_balance = data.get('senderBalance')
            receiver_balance = data.get('receiverBalance')

            # Update sender's balance
            sender = Customer.objects.get(CustomerID=sender_id)
            sender.AccountBalance = sender_balance
            sender.save()

            # Update receiver's balance
            receiver = Customer.objects.get(CustomerID=receiver_id)
            receiver.AccountBalance = receiver_balance
            receiver.save()


            return JsonResponse({'message': 'Transfer successful'}, status=200)
        except Exception as e:
            print('Error:', e)  # Debug print statement
            return JsonResponse({'error': str(e)}, status=400)
    else:
        return JsonResponse({'error': 'Method not allowed'}, status=405)
