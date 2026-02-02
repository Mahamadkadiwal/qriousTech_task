import { getCookiesValue } from '../_lib/getCookiesValue';

export default async function Page() {
    const { permissions, roles } = await getCookiesValue();
    return (
        <div className="space-y-8">

            <div className="flex items-center justify-between">
                <h2 className="text-3xl font-semibold text-white tracking-wide">
                    Dashboard
                </h2>
            </div>



        </div>
    )
}
