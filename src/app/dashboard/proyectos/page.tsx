import { FolderKanban } from "lucide-react";
import ComingSoon from "@/components/neuron/ComingSoon";

export default function ProyectosPage() {
  return (
    <ComingSoon
      title="Proyectos"
      description="Aquí podrás organizar tus proyectos de marketing por equipo y fecha de entrega."
      icon={FolderKanban}
    />
  );
}
