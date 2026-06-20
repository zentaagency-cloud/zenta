import { Settings } from "lucide-react";
import ComingSoon from "@/components/neuron/ComingSoon";

export default function ConfiguracionPage() {
  return (
    <ComingSoon
      title="Configuración"
      description="Ajusta tu cuenta, notificaciones y preferencias de la plataforma."
      icon={Settings}
    />
  );
}
