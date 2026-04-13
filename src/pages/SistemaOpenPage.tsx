import CategoryTreePage from "@/components/CategoryTreePage";
import { sistemaOpenRoot } from "@/data/sistemaOpen";

const SistemaOpenPage = () => (
  <CategoryTreePage root={sistemaOpenRoot} basePath="/sistema-open" />
);

export default SistemaOpenPage;
