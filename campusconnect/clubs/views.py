from rest_framework.response import Response

from django.shortcuts import render
from django.contrib.auth.models import User

from rest_framework.views import APIView
from .models import Club
from rest_framework import status

from posts.models import Post
from .models import Club

from .serializers import ClubSerializer

# Create your views here.
class CreateClubView(APIView):
    serializer_class = ClubSerializer
    
    def post(self, request):
        print(request.data)
        serializer = self.serializer_class(data=request.data)
        
        if serializer.is_valid():
            clubName = serializer.data.get('name')
            clubDesc = serializer.data.get('description')
            clubLoc = serializer.data.get('location')
            clubEmail = serializer.data.get('email')
            clubContact = serializer.data.get('contact')
            clubWebsite = serializer.data.get('website')
            clubImage = serializer.data.get('image')
            clubOrganizer = request.user
                        
            queryset = Club.objects.filter(name=clubName)
            if queryset.exists():
                return Response(status=status.HTTP_400_BAD_REQUEST)
                        
            # TODO - Should we immediately put the club organizer into Follows model?
            
            club = Club.objects.create(name=clubName, description=clubDesc, location=clubLoc, 
                                            email=clubEmail, contact=clubContact, website=clubWebsite, organizer=clubOrganizer, image=clubImage)
            club.save()

            
            
            return Response({'club_id': str(club.id)}, status=status.HTTP_201_CREATED)
        
        print("Here")
        return Response(status=status.HTTP_400_BAD_REQUEST)
    
class GetClubView(APIView):
    def get(self, request, name, id):
        # TODO: Eventually, we'll also have to include events and members associated with this club
        c = Club.objects.filter(name=name, id=id).values().first()
        posts = Post.objects.filter(club=id).order_by('-time_posted').values()
        for post in posts:
            post['author'] = User.objects.get(id=post['author_id']).username
            del post['author_id']
        if c:
            return Response({'club_data': c, 'posts': posts}, status=status.HTTP_200_OK)
        return Response(status=status.HTTP_404_NOT_FOUND)

            
            