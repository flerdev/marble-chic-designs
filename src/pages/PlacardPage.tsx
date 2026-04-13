import CategoryTreePage from "@/components/CategoryTreePage";
import { placardsRoot } from "@/data/placards";

const PlacardPage = () => (
  <CategoryTreePage root={placardsRoot} basePath="/placards" />
);

export default PlacardPage;
