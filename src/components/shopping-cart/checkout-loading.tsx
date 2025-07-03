"use client";

import { Loader2 } from "lucide-react";
import { Card } from "@/components/ui/card";

export default function CheckoutLoading() {
  return (
    <Card className="p-6">
      <div className="flex items-center justify-center space-x-2">
        <Loader2 className="h-6 w-6 animate-spin" />
        <span>Cargando...</span>
      </div>
    </Card>
  );
}
