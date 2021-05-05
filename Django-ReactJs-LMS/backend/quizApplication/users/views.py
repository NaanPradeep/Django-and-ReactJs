from rest_framework import viewsets
from .models import UserAccounts
from .serializers import UserDetailSerializer

class UserAccountViewSet(viewsets.ModelViewSet):
    serializer_class = UserDetailSerializer
    queryset = UserAccounts.objects.all()
