type ContactConfig = {
  whatsappNumber: string | null;
  whatsappMessage: string;
  instagramUrl: string;
  youtubeUrl: string;
};

export const contactConfig: ContactConfig = {
  // TODO: Substituir pelo número confirmado no formato 55DDDNÚMERO.
  // Enquanto estiver null, nenhum link de WhatsApp será publicado.
  whatsappNumber: null,
  whatsappMessage:
    "Olá! Gostaria de receber informações sobre os serviços e o atendimento da Impact Slug.",
  instagramUrl: "https://www.instagram.com/impactslug/",
  youtubeUrl: "https://www.youtube.com/@ImpactPCP",
};

export function getWhatsappUrl() {
  const number = contactConfig.whatsappNumber?.replace(/\D/g, "");

  if (!number) {
    return null;
  }

  return `https://wa.me/${number}?text=${encodeURIComponent(contactConfig.whatsappMessage)}`;
}
