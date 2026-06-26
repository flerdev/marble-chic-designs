import CategoryTreePage from "@/components/CategoryTreePage";
import { piletasRoot } from "@/data/piletas";

const PiletasPage = () => (
  <CategoryTreePage root={piletasRoot} basePath="/piletas" />
);

export default PiletasPage;
