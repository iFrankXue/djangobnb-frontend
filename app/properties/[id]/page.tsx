import Image from "next/image";
import ReservationSidebar from "@/app/components/Properties/ReservationSidebar";

import apiService from "@/app/services/apiService";
import { getUserId } from "@/app/lib/actions";

const PropertyDetailPage = async ({params}: {params: {id: string}}) => {
    const property = await apiService.getWithoutToken(`api/properties/${params.id}/`);
    const userId = await getUserId();

    return (
        <main className="max-w-[1500px] mx-auto px-6 pb-6">
            <div className="w-full mb-4 h-[64vh] overflow-hidden rounded-xl relative">
                <Image
                    fill
                    src={property.image_url}
                    className="object-cover w-full h-full"
                    alt="House"
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                <div className="py-6 col-span-3">
                    <h1 className="mb-4 text-4xl">{property.title}</h1>
                    <span className="mb-6 block text-lg text-gray-600">
                        {property.guests} guests - {property.bedrooms} bedrooms - {property.bathrooms} bathroom
                    </span>

                    <hr />
                    <div className="py-6 flex items-center space-x-4">
                        {property.landlord.avatar_url ? (
                            <Image
                                src={property.landlord.avatar_url}
                                width={50}
                                height={50}
                                className="rounded-full"
                                alt="The Landlord"
                            />
                        ) : (
                            ''
                        )}
                        <p><strong>{property.landlord.name}</strong> is your host</p>
                    </div>

                    <hr />

                    <p className="mt-6 text-lg">{property.description}</p>

                </div>

                <ReservationSidebar
                    userId={userId}
                    property={property}
                />

            </div>
        </main>
    )
}

export default PropertyDetailPage;