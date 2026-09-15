import React from "react";
import { RefreshControl, ScrollView } from "react-native";
import HeroSection from "../../components/pages/home/HeroSection";
import PopularSection from "../../components/pages/home/PopularSection";
import PromoBanner from "../../components/pages/home/PromoBanner";
import QuickCategories from "../../components/pages/home/QuickCategories";
import TopSection from "../../components/pages/home/TopSection";
import { ThemedView } from "../../components/theme";
import { homeStyles as styles } from "../../styles/home";

const Home = () => {
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = () => {
    setRefreshing(true);
    // Fetch new data
    setTimeout(() => setRefreshing(false), 1000);
  };

  return (
    <ThemedView safeArea={true}>
      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={["#6849a7"]}
            tintColor="#6849a7"
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
