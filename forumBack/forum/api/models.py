from django.contrib.auth.base_user import BaseUserManager, AbstractBaseUser
from django.contrib.auth.hashers import make_password
from django.contrib.auth.models import PermissionsMixin
from django.db import models


class UserManager(BaseUserManager):
    use_in_migrations = True

    def _create_user(self, email, password, **extra_fields):

        email = self.normalize_email(email)

        user = self.model(email=email, **extra_fields)
        user.password = make_password(password)
        user.save(using=self._db)
        return user

    def create_user(self, email=None, password=None, **extra_fields):
        extra_fields.setdefault("is_staff", False)
        extra_fields.setdefault("is_superuser", False)
        return self._create_user(email, password, **extra_fields)

    def create_superuser(self, email=None, password=None, **extra_fields):
        extra_fields.setdefault("is_staff", True)
        extra_fields.setdefault("is_superuser", True)

        if extra_fields.get("is_staff") is not True:
            raise ValueError("Superuser must have is_staff=True.")
        if extra_fields.get("is_superuser") is not True:
            raise ValueError("Superuser must have is_superuser=True.")

        return self._create_user(email, password, **extra_fields)


class User(AbstractBaseUser, PermissionsMixin):
    name = models.CharField(max_length=99)
    description = models.CharField(max_length=1000,blank=True)
    img = models.ImageField(upload_to='img/', blank=True)
    email = models.EmailField(unique=True)
    is_staff = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)

    objects = UserManager()

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["name"]


class Category(models.Model):
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name


class Theme(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, blank=True)
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    name = models.CharField(max_length=200)
    content = models.CharField(max_length=10000)
    img = models.ImageField(upload_to='img/', blank=True)
    data = models.CharField(max_length=100)
    time = models.CharField(max_length=100)

    def __str__(self):
        return self.name


class Comment(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, blank=True)
    theme = models.ForeignKey(Theme, on_delete=models.CASCADE)
    reply = models.ForeignKey('self', on_delete=models.CASCADE, blank=True, null=True, related_name='replies')
    message = models.CharField(max_length=2000)
    img = models.ImageField(upload_to='img/', blank=True)
    data = models.CharField(max_length=100)
    time = models.CharField(max_length=100)

    def __str__(self):
        return self.message
