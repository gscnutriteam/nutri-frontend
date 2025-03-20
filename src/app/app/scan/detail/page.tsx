import ScanDetail from "@/services/scan/pages/scan_result";
import { metadataScanDetailResult } from "@/services/scan/pages/scan_result_fix";

export const metadata = metadataScanDetailResult;
export default function Page() {
  return <ScanDetail />;
}
