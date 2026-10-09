import React from "react";
import { useQueryClient } from "@tanstack/react-query";
import { RefreshControl, ScrollView } from "react-native";
import HeroSection from "../../components/pages/home/HeroSection";
import PopularSection from "../../components/pages/home/PopularSection";
import PromoBanner from "../../components/pages/home/PromoBanner";
import QuickCategories from "../../components/pages/home/QuickCategories";
import TopSection from "../../components/pages/home/TopSection";
import { ThemedView } from "../../components/theme";
import { foodCategoryQueryKeys } from "../../hooks/useCategories";
import { dishQueryKeys } from "../../hooks/useDishes";
import { homeStyles as styles } from "../../styles/home";

const Home = () => {
  const [refreshing, setRefreshing] = React.useState(false);
  const queryClient = useQueryClient();

  const onRefresh = async () => {
    setRefreshing(true);
    try {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: foodCategoryQueryKeys.all }),
        queryClient.invalidateQueries({ queryKey: dishQueryKeys.all }),
      ]);
    } finally {
      setRefreshing(false);
    }
  };

  return (
    <ThemedView safeArea={true} style={styles.screen}>
      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={["#F56B45"]}
            tintColor="#F56B45"
          />
        }
      >
        <TopSection />
        <HeroSection />
        <QuickCategories />
        <PopularSection />
        <PromoBanner />
      </ScrollView>
    </ThemedView>
  );
};

export default Home;
