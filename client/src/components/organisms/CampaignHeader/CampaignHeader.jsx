import styles from "./CampaignHeader.module.scss";
import { DashboardHeader } from "@/components/molecules/DashboardHeader/DashboardHeader";
import { PrimaryButton } from "@/components/atoms/Button/PrimaryButton";
import { FaDownload, FaWrench } from "react-icons/fa";
import Link from "next/link";
import { ExportInstantlyModal } from "../Modals/ExportInstantlyModal/ExportInstantlyModal";
import { ExportGoogleModal } from "../Modals/ExportGoogleModal/ExportGoogleModal";
import { exportLeadsToCsv } from "@/services/lead";

const CampaignHeader = ({ campaignId, data }) => {
  const onDownload = async () => {
    await exportLeadsToCsv(campaignId, data.name);
  };

  return (
    <div>
      <DashboardHeader title={data.name} href="/dashboard/campaigns">
        {data.googlesheet_id && <ExportGoogleModal campaignId={campaignId} />}

        <PrimaryButton onClick={onDownload}>
          <FaDownload />
        </PrimaryButton>
        <Link href={`/dashboard/campaigns/${campaignId}/settings`}>
          <PrimaryButton>
            <FaWrench />
          </PrimaryButton>
        </Link>
        {data.instantly_id && <ExportInstantlyModal campaignId={campaignId} />}
      </DashboardHeader>
    </div>
  );
};

export default CampaignHeader;
