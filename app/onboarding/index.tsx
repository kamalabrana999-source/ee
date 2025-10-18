import { View, Text, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'expo-router';
import { MapPin, Globe } from 'lucide-react-native';
import * as Location from 'expo-location';
import { useAppStore } from '../../store/useAppStore';

export default function OnboardingScreen() {
  const { t, i18n } = useTranslation();
  const router = useRouter();
  const { setCurrentLocation, setSelectedLanguage } = useAppStore();

  const requestLocationPermission = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status === 'granted') {
      const location = await Location.getCurrentPositionAsync({});
      setCurrentLocation({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });
      router.replace('/(tabs)');
    }
  };

  const languages = [
    { code: 'en', name: 'English' },
    { code: 'ru', name: 'Русский' },
    { code: 'tr', name: 'Türkçe' },
    { code: 'th', name: 'ไทย' },
    { code: 'id', name: 'Bahasa Indonesia' },
  ];

  const handleLanguageChange = (langCode: string) => {
    i18n.changeLanguage(langCode);
    setSelectedLanguage(langCode);
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 justify-between p-6">
        <View className="flex-1 justify-center items-center">
          <View className="w-32 h-32 bg-primary rounded-full items-center justify-center mb-6">
            <MapPin color="#FFFFFF" size={64} />
          </View>

          <Text className="text-3xl font-[Poppins_700Bold] text-neutral-900 text-center mb-3">
            {t('onboarding.welcome')}
          </Text>

          <Text className="text-lg font-[Inter_400Regular] text-neutral-600 text-center mb-8">
            {t('onboarding.subtitle')}
          </Text>

          <View className="w-full bg-background rounded-2xl p-4 mb-6">
            <View className="flex-row items-center mb-3">
              <Globe color="#4CAF50" size={24} />
              <Text className="text-base font-[Poppins_600SemiBold] text-neutral-900 ml-2">
                {t('onboarding.selectLanguage')}
              </Text>
            </View>
            <View className="flex-row flex-wrap">
              {languages.map((lang) => (
                <TouchableOpacity
                  key={lang.code}
                  onPress={() => handleLanguageChange(lang.code)}
                  className={`px-4 py-2 rounded-full mr-2 mb-2 ${
                    i18n.language === lang.code ? 'bg-primary' : 'bg-neutral-200'
                  }`}
                >
                  <Text
                    className={`text-sm font-[Inter_600SemiBold] ${
                      i18n.language === lang.code ? 'text-white' : 'text-neutral-700'
                    }`}
                  >
                    {lang.name}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>

        <View>
          <View className="bg-background rounded-2xl p-4 mb-4">
            <View className="flex-row items-start">
              <MapPin color="#4CAF50" size={24} />
              <View className="flex-1 ml-3">
                <Text className="text-sm font-[Inter_600SemiBold] text-neutral-900 mb-1">
                  Location Permission
                </Text>
                <Text className="text-xs font-[Inter_400Regular] text-neutral-600">
                  {t('onboarding.locationPermission')}
                </Text>
              </View>
            </View>
          </View>

          <TouchableOpacity
            onPress={requestLocationPermission}
            className="bg-primary rounded-full py-4 items-center justify-center shadow-sm"
          >
            <Text className="text-white font-[Poppins_600SemiBold] text-base">
              {t('onboarding.getStarted')}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => router.replace('/(tabs)')}
            className="mt-3 py-3"
          >
            <Text className="text-sm font-[Inter_500Medium] text-neutral-500 text-center">
              Skip for now
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
