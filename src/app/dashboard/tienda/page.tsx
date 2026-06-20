import { ShoppingBag } from "lucide-react";
import ComingSoon from "@/components/neuron/ComingSoon";

export default function TiendaPage() {
  return (
    <ComingSoon
      title="Tienda"
      description="Gestiona productos y servicios que promociones en tus campañas."
      icon={ShoppingBag}
    />
  );
}
