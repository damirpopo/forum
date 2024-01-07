from django.shortcuts import render, get_object_or_404
from .models import *
from .serializer import *
from rest_framework.authtoken.models import Token
from rest_framework.permissions import *
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response


@api_view(['POST'])
def signupView(request):
    serializer = SignupSerializer(data=request.data)
    if serializer.is_valid():
        user = serializer.save()
        return Response({'data': {'user_token': Token.objects.create(user=user).key}}, status=201)
    return Response({'data': {'error': 422, 'message': 'Validation error', 'error': serializer.errors}}, status=422)


@api_view(['POST'])
def loginView(request):
    serializer = LoginSerializer(data=request.data)
    if serializer.is_valid():
        try:
            user = User.objects.get(email=serializer.validated_data['email'],
                                    password=serializer.validated_data['password'])
        except:
            return Response({'error': {'code': 402, 'message': 'Authentication error'}}, status=402)
        token, _ = Token.objects.get_or_create(user=user)
        return Response({'data': {'user_token': token.key}}, status=200)
    return Response({'data': {'error': 422, 'message': 'Validation error', 'error': serializer.errors}}, status=422)


@api_view(['GET'])
@permission_classes([IsAuthenticated, ])
def logoutView(request):
    request.user.auth_token.delete()
    return Response({'data': {"message": 'logout'}}, status=200)


@api_view(['GET'])
def listCategory(request):
    category = Category.objects.all()
    serializer = CategorySerializer(category, many=True)
    return Response({'data': serializer.data}, status=200)


@api_view(['POST'])
@permission_classes([IsAdminUser, ])
def addCategory(request):
    serializer = CategorySerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response({'data': {"message": "Category added"}}, status=201)
    return Response({'error': {'code': 422, 'message': 'Validation error', 'error': serializer.errors}}, status=422)


@api_view(['GET', 'PATCH', 'DELETE'])
@permission_classes([IsAdminUser, ])
def detailCategory(request, pk):
    try:
        category = Category.objects.get(pk=pk)
    except:
        return Response({'error': {'code': 404, 'message': 'not found'}}, status=404)
    if request.method == 'GET':
        serializer = CategorySerializer(category)
        return Response({'data': serializer.data}, status=200)
    elif request.method == 'PATCH':
        serializer = CategorySerializer(category, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response({'data': serializer.data}, status=200)
    elif request.method == 'DELETE':
        category.delete()
        return Response({'data': {'message': 'category remove'}}, status=200)


@api_view(['GET', 'POST'])
def listAndPostTheme(request):
    if request.method == 'GET':
        theme = Theme.objects.all()
        serializer = ThemeSerializer(theme, many=True,context={'request': request})
        return Response({'data': serializer.data}, status=200)
    elif request.method == 'POST':
        if not request.user.is_authenticated:
            return Response({'error': {'code': 403, 'message': 'Forbidden for you'}}, status=403)
        serializer = ThemeSerializers(data=request.data)
        if serializer.is_valid():
            serializer.validated_data['user'] = request.user
            serializer.save()
            return Response({'data': {'message': 'Them added'}}, status=201)
        return Response({'error': {'code': 422, 'message': 'Validation error', 'error': serializer.errors}}, status=422)


@api_view(['GET'])
@permission_classes([IsAuthenticated, ])
def userGetTheme(request):
    theme = Theme.objects.filter(user=request.user)
    serializer = ThemeSerializer(theme, many=True)
    return Response({'data': serializer.data}, status=200)


@api_view(['GET'])
def getPkTheme(request, pk):
    theme = Theme.objects.get(pk=pk)
    serializer = ThemeSerializer(theme, context={'request': request})
    return Response({'data': serializer.data}, status=200)


@api_view(['GET', 'PATCH', 'PUT', 'DELETE'])
@permission_classes([IsAuthenticated, ])
def detailTheme(request, pk):
    try:
        theme = Theme.objects.get(pk=pk, user=request.user)
    except Theme.DoesNotExist:
        return Response({'error': {'code': 403, 'message': 'Forbidden for you'}}, status=403)
    if request.method == 'GET':
        serializer = ThemeSerializer(theme)
        return Response({'data': serializer.data}, status=200)
    elif request.method == 'PATCH':
        serializer = ThemeSerializers(theme, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response({'data': serializer.data}, status=200)
    elif request.method == 'PUT':
        serializer = ThemeSerializers(theme, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({'data': serializer.data}, status=200)
    elif request.method == 'DELETE':
        theme.delete()
        return Response({'data': {'message': 'Them remove'}}, status=200)


@api_view(['PATCH', 'PUT', 'DELETE'])
@permission_classes([IsAdminUser, ])
def adminDetailTheme(request, pk):
    try:
        theme = Theme.objects.get(pk=pk)
    except Theme.DoesNotExist:
        return Response({'error': {'code': 403, 'message': 'Forbidden for you'}}, status=403)
    if request.method == 'PATCH':
        serializer = ThemeSerializers(theme, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response({'data': serializer.data}, status=200)
    elif request.method == 'PUT':
        serializer = ThemeSerializers(theme, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({'data': serializer.data}, status=200)
    elif request.method == 'DELETE':
        theme.delete()
        return Response({'data': {'message': 'Them remove'}}, status=200)


@api_view(['GET', 'POST'])
def listAndPostComment(request):
    if request.method == 'GET':
        comment = Comment.objects.all()
        serializer = CommentSerializer(comment, many=True, context={'request': request})
        return Response({'data': serializer.data}, status=200)
    elif request.method == 'POST':
        if not request.user.is_authenticated:
            return Response({'error': {'code': 403, 'message': 'Forbidden for you'}}, status=403)
        serializer = CommentSerializers(data=request.data)
        if serializer.is_valid():
            serializer.validated_data['user'] = request.user
            serializer.save()
            return Response({'data': {'message': 'Comment added'}}, status=201)
        return Response({'error': {'code': 422, 'message': 'Validation error', 'error': serializer.errors}}, status=422)


@api_view(['GET'])
@permission_classes([IsAuthenticated, ])
def userGetCommetn(request):
    comment = Comment.objects.filter(user=request.user)
    serializer = CommentSerializer(comment, many=True)
    return Response({'data': serializer.data}, status=200)


@api_view(['GET', 'PATCH', 'PUT', 'DELETE'])
@permission_classes([IsAuthenticated, ])
def detailComment(request, pk):
    try:
        comment = Comment.objects.get(pk=pk, user=request.user)
    except Comment.DoesNotExist:
        return Response({'error': {'code': 403, 'message': 'Forbidden for you'}}, status=403)
    if request.method == 'GET':
        serializer = CommentSerializer(comment)
        return Response({'data': serializer.data}, status=200)
    elif request.method == 'PATCH':
        serializer = CommentSerializers(comment, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response({'data': serializer.data}, status=200)
    elif request.method == 'PUT':
        serializer = CommentSerializers(comment, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({'data': serializer.data}, status=200)
    elif request.method == 'DELETE':
        comment.delete()
        return Response({'data': {'message': 'Comment remove'}}, status=200)


@api_view(['PATCH', 'PUT', 'DELETE'])
@permission_classes([IsAdminUser, ])
def adminDetailComment(request, pk):
    try:
        comment = Comment.objects.get(pk=pk)
    except Comment.DoesNotExist:
        return Response({'error': {'code': 403, 'message': 'Forbidden for you'}}, status=403)
    if request.method == 'PATCH':
        serializer = CommentSerializers(comment, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response({'data': serializer.data}, status=200)
    elif request.method == 'PUT':
        serializer = CommentSerializers(comment, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({'data': serializer.data}, status=200)
    elif request.method == 'DELETE':
        comment.delete()
        return Response({'data': {'message': 'Comment remove'}}, status=200)


@api_view(['GET'])
@permission_classes([IsAuthenticated, ])
def getUser(request):
    try:
        user = request.user
    except User.DoesNotExist:
        return Response({'error': {'code': 403, 'message': 'Forbidden for you'}}, status=403)
    serializer = UserSerializer(user, context={'request': request})
    return Response({'data': serializer.data}, status=200)


@api_view(['PATCH', ])
@permission_classes([IsAuthenticated, ])
def patchUser(request, pk):
    try:
        user = get_object_or_404(User, pk=pk)
    except User.DoesNotExist:
        return Response({'error': {'code': 403, 'message': 'Forbidden for you'}}, status=403)
    if user == request.user:
        serializer = UserSerializer(user, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response({'data': serializer.data}, status=200)
        return Response({'error': {"code": 403, 'message': 'пошел отсюда'}}, status=403)


@api_view(['GET'])
def getAllUser(request):
    user = User.objects.all()
    serializer = UserSerializer(user, context={'request': request}, many=True)
    return Response({'data': serializer.data}, status=200)
