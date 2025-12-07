import React from "react";
import { RefreshControl, ScrollView, StyleSheet } from "react-native";
import HeroSection from "../../components/pages/home/HeroSection";
import PopularSection from "../../components/pages/home/PopularSection";
import QuickCategories from "../../components/pages/home/QuickCategories";
import TopSection from "../../components/pages/home/TopSection";
import PromoBanner from "../../components/pages/home/PromoBanner";
import { Spacer, ThemedView } from "../../components/theme";

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

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingBottom: 0,
  },
});
