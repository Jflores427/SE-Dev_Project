from rest_framework import serializers


from .models import Post



        
class PostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = ('title', 'body')
        
class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = '__all__'
