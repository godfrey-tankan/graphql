import graphene
from graphene_django.types import DjangoObjectType
from .models import CustomUser, UserProfile

class UserType(DjangoObjectType):
    class Meta:
        model = CustomUser

class UserProfileType(DjangoObjectType):
    class Meta:
        model = UserProfile

class Query(graphene.ObjectType):
    all_users = graphene.List(UserType)
    user_by_id = graphene.Field(UserType, id=graphene.Int(required=True))
    user_by_username = graphene.Field(UserType, username=graphene.String(required=True))

    def resolve_all_users(self, info, **kwargs):
        return CustomUser.objects.all()
    
    def resolve_user_by_id(self, info, id):
        return CustomUser.objects.filter(id=id).first()

    def resolve_user_by_username(self, info, username):
        return CustomUser.objects.filter(username=username).first()

schema = graphene.Schema(query=Query)
