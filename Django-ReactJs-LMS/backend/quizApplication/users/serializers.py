from rest_framework import serializers
from rest_auth.registration.serializers import RegisterSerializer
from .models import UserAccounts
from allauth.account.adapter import get_adapter
from django.contrib.auth import authenticate



class UserDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserAccounts
        fields = ('id', 'email', 'username', 'date_of_birth', 'is_staff')


class UserRegisterSerializer(RegisterSerializer):
    date_of_birth = serializers.DateField()

    class Meta:
        model = UserAccounts
        fields = ('username', 'email', 'password', 'date_of_birth')


    def get_cleaned_data(self):
        return {
            'username': self.validated_data.get('username', ''),
            'email': self.validated_data.get('email', ''),
            'password1': self.validated_data.get('password1', ''),
            'password2': self.validated_data.get('password2', ''),
            'date_of_birth': self.validated_data.get('date_of_birth', '')
        }

    def save(self, request):
        adapter = get_adapter()
        user = adapter.new_user(request)
        self.cleaned_data = self.get_cleaned_data()
        user.date_of_birth = self.cleaned_data.get('date_of_birth')
        user.save()
        adapter.save_user(request, user, self)
        return user







    