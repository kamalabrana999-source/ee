import { View, Text, TextInput, TouchableOpacity, ScrollView, Image, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { PostCategory } from '../../types';
import { CATEGORY_COLORS } from '../../constants/categories';
import { Camera, MapPin, X, Check, AlertCircle } from 'lucide-react-native';
import * as ImagePicker from 'expo-image-picker';

const CATEGORIES: PostCategory[] = ['lostFound', 'marketplace', 'safety', 'event', 'general'];

export default function CreatePostScreen() {
  const { t } = useTranslation();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<PostCategory | null>(null);
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [radius, setRadius] = useState(1000);
  const [errors, setErrors] = useState<{ title?: string; description?: string; category?: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.8,
    });

    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
    }
  };

  const validateForm = () => {
    const newErrors: { title?: string; description?: string; category?: string } = {};

    if (!title.trim()) {
      newErrors.title = 'Title is required';
    } else if (title.length < 5) {
      newErrors.title = 'Title must be at least 5 characters';
    } else if (title.length > 100) {
      newErrors.title = 'Title must be less than 100 characters';
    }

    if (!description.trim()) {
      newErrors.description = 'Description is required';
    } else if (description.length < 10) {
      newErrors.description = 'Description must be at least 10 characters';
    }

    if (!selectedCategory) {
      newErrors.category = 'Please select a category';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      console.log('Creating post:', { title, description, selectedCategory, imageUri, radius });

      setTitle('');
      setDescription('');
      setSelectedCategory(null);
      setImageUri(null);
      setRadius(1000);
      setErrors({});
      setIsSubmitting(false);

      Alert.alert('Success', 'Your post has been created successfully!');
    }, 1000);
  };

  return (
    <SafeAreaView className="flex-1 bg-background">
      <View className="px-4 py-3 bg-white border-b border-neutral-200">
        <Text className="text-xl font-[Poppins_700Bold] text-neutral-900">
          {t('post.createPost')}
        </Text>
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="p-4">
          <View className="mb-4">
            <View className="flex-row items-center justify-between mb-2">
              <Text className="text-sm font-[Inter_600SemiBold] text-neutral-700">
                {t('post.selectCategory')} <Text className="text-red-500">*</Text>
              </Text>
              {errors.category && (
                <View className="flex-row items-center">
                  <AlertCircle color="#FF6B6B" size={14} />
                  <Text className="text-xs font-[Inter_500Medium] text-red-500 ml-1">
                    Required
                  </Text>
                </View>
              )}
            </View>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} className="-mx-1">
              {CATEGORIES.map((category) => (
                <TouchableOpacity
                  key={category}
                  onPress={() => {
                    setSelectedCategory(category);
                    setErrors({ ...errors, category: undefined });
                  }}
                  className={`mx-1 px-4 py-2.5 rounded-full ${
                    errors.category && !selectedCategory ? 'border-2 border-red-300' : ''
                  }`}
                  style={{
                    backgroundColor:
                      selectedCategory === category
                        ? CATEGORY_COLORS[category]
                        : CATEGORY_COLORS[category] + '20',
                  }}
                >
                  <View className="flex-row items-center">
                    {selectedCategory === category && (
                      <Check color="#FFFFFF" size={16} style={{ marginRight: 4 }} />
                    )}
                    <Text
                      className="text-sm font-[Inter_600SemiBold]"
                      style={{
                        color: selectedCategory === category ? '#FFFFFF' : CATEGORY_COLORS[category],
                      }}
                    >
                      {t(`post.categories.${category}`)}
                    </Text>
                  </View>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>

          <View className="mb-4">
            <Text className="text-sm font-[Inter_600SemiBold] text-neutral-700 mb-2">
              {t('post.title')} <Text className="text-red-500">*</Text>
            </Text>
            <TextInput
              className={`bg-white rounded-xl px-4 py-3 font-[Inter_400Regular] text-neutral-900 border ${
                errors.title ? 'border-red-500' : 'border-neutral-300'
              }`}
              placeholder="Enter a descriptive title"
              placeholderTextColor="#9E9E9E"
              value={title}
              onChangeText={(text) => {
                setTitle(text);
                if (errors.title) {
                  setErrors({ ...errors, title: undefined });
                }
              }}
              maxLength={100}
            />
            <View className="flex-row items-center justify-between mt-1">
              {errors.title ? (
                <Text className="text-xs font-[Inter_500Medium] text-red-500">
                  {errors.title}
                </Text>
              ) : (
                <Text className="text-xs font-[Inter_400Regular] text-neutral-500">
                  Min 5 characters
                </Text>
              )}
              <Text className="text-xs font-[Inter_400Regular] text-neutral-500">
                {title.length}/100
              </Text>
            </View>
          </View>

          <View className="mb-4">
            <Text className="text-sm font-[Inter_600SemiBold] text-neutral-700 mb-2">
              {t('post.description')} <Text className="text-red-500">*</Text>
            </Text>
            <TextInput
              className={`bg-white rounded-xl px-4 py-3 font-[Inter_400Regular] text-neutral-900 border ${
                errors.description ? 'border-red-500' : 'border-neutral-300'
              }`}
              placeholder="Provide more details about your post"
              placeholderTextColor="#9E9E9E"
              value={description}
              onChangeText={(text) => {
                setDescription(text);
                if (errors.description) {
                  setErrors({ ...errors, description: undefined });
                }
              }}
              multiline
              numberOfLines={6}
              textAlignVertical="top"
            />
            {errors.description && (
              <Text className="text-xs font-[Inter_500Medium] text-red-500 mt-1">
                {errors.description}
              </Text>
            )}
          </View>

          <View className="mb-4">
            <Text className="text-sm font-[Inter_600SemiBold] text-neutral-700 mb-2">
              {t('post.addImage')}
            </Text>
            {imageUri ? (
              <View className="relative">
                <Image source={{ uri: imageUri }} className="w-full h-48 rounded-xl" />
                <TouchableOpacity
                  onPress={() => setImageUri(null)}
                  className="absolute top-2 right-2 w-8 h-8 bg-black/50 rounded-full items-center justify-center"
                >
                  <X color="#FFFFFF" size={20} />
                </TouchableOpacity>
              </View>
            ) : (
              <TouchableOpacity
                onPress={pickImage}
                className="bg-white rounded-xl py-12 border-2 border-dashed border-neutral-300 items-center justify-center"
              >
                <Camera color="#9E9E9E" size={32} />
                <Text className="text-sm font-[Inter_500Medium] text-neutral-500 mt-2">
                  Tap to select image
                </Text>
              </TouchableOpacity>
            )}
          </View>

          <View className="mb-4">
            <View className="flex-row items-center justify-between mb-2">
              <Text className="text-sm font-[Inter_600SemiBold] text-neutral-700">
                {t('post.visibilityRadius')}
              </Text>
              <Text className="text-sm font-[Inter_600SemiBold] text-primary">
                {radius >= 1000 ? `${(radius / 1000).toFixed(1)}km` : `${radius}m`}
              </Text>
            </View>
            <View className="flex-row items-center space-x-2">
              {[500, 1000, 2000, 5000].map((value) => (
                <TouchableOpacity
                  key={value}
                  onPress={() => setRadius(value)}
                  className={`flex-1 py-2 rounded-lg ${
                    radius === value ? 'bg-primary' : 'bg-neutral-200'
                  }`}
                >
                  <Text
                    className={`text-center text-sm font-[Inter_600SemiBold] ${
                      radius === value ? 'text-white' : 'text-neutral-700'
                    }`}
                  >
                    {value >= 1000 ? `${value / 1000}km` : `${value}m`}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View className="mb-4">
            <View className="flex-row items-center bg-white rounded-xl px-4 py-3 border border-neutral-300">
              <MapPin color="#4CAF50" size={20} />
              <Text className="text-sm font-[Inter_500Medium] text-neutral-700 ml-2 flex-1">
                Current Location
              </Text>
            </View>
          </View>

          <TouchableOpacity
            onPress={handleSubmit}
            className={`rounded-full py-4 items-center justify-center shadow-sm ${
              isSubmitting ? 'bg-neutral-400' : 'bg-primary'
            }`}
            disabled={isSubmitting}
          >
            <View className="flex-row items-center">
              {isSubmitting && (
                <Text className="text-white font-[Poppins_600SemiBold] text-base mr-2">
                  Creating...
                </Text>
              )}
              {!isSubmitting && (
                <Text className="text-white font-[Poppins_600SemiBold] text-base">
                  {t('common.submit')}
                </Text>
              )}
            </View>
          </TouchableOpacity>

          <View className="mt-4 p-4 bg-blue-50 rounded-xl border border-blue-200">
            <View className="flex-row items-start">
              <AlertCircle color="#2196F3" size={20} />
              <View className="flex-1 ml-2">
                <Text className="text-sm font-[Inter_600SemiBold] text-neutral-900 mb-1">
                  Post Guidelines
                </Text>
                <Text className="text-xs font-[Inter_400Regular] text-neutral-600">
                  Be respectful and honest. Posts are visible to neighbors within your selected radius. Follow community guidelines.
                </Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
