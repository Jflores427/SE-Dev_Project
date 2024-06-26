from rest_framework import serializers
from django.contrib.auth.validators import UnicodeUsernameValidator
from django.contrib.auth.models import User
from .models import Club, Follow

class ClubSerializer(serializers.ModelSerializer):
    class Meta:
        model = Club
        fields=('name', 'description', 'location', 'email', 'contact', 'website') 

class FollowSerializer(serializers.ModelSerializer):
    class Meta:
        model = Follow
        fields=('user', 'club')

class RoleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Follow
        fields=('role')
        
class MembershipSerializer(serializers.ModelSerializer):
    class Meta:
        model = Follow
        fields=('user', 'club', 'role')