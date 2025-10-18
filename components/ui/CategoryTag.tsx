import { View, Text } from 'react-native';
import { useTranslation } from 'react-i18next';
import { PostCategory } from '../../types';
import { CATEGORY_COLORS } from '../../constants/categories';

interface CategoryTagProps {
  category: PostCategory;
}

export function CategoryTag({ category }: CategoryTagProps) {
  const { t } = useTranslation();
  const backgroundColor = CATEGORY_COLORS[category];

  return (
    <View
      className="px-2 py-1 rounded-full"
      style={{ backgroundColor: backgroundColor + '20' }}
    >
      <Text
        className="text-xs font-[Inter_600SemiBold]"
        style={{ color: backgroundColor }}
      >
        {t(`post.categories.${category}`)}
      </Text>
    </View>
  );
}
