import Image from "next/image";

export default function Exhibition() {
  return (
    <div className="relative h-96">
      <Image
        src="/knochen.webp"
        alt="Meanwhile... by Markus Heller"
        fill
        className="object-cover"
      />

      <div className="flex flex-col justify-center">
        <h2 className="text-3xl mb-4">Meanwhile...</h2>
        <p className="mb-2">by Markus Heller</p>
        <p className="mb-4">@markus.heller</p>
        <p className="mb-4">Photo: @reprofoto1</p>
        <p className="text-gray-600">
          The show is made possible with the friendly support of the Cultural
          Office of the City of Leipzig and the Stiftung Kunstfonds.
        </p>
      </div>
    </div>
  );
}
