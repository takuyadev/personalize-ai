import styles from "./SelectGoogleSheet.module.scss";
import { Form } from "@/components/atoms/Form/Form";
import { GoogleSheetCard } from "@/components/molecules/Cards/GoogleSheetCard/GoogleSheetCard";
import { Loading } from "@/components/atoms/Loading/Loading";
import { Message } from "@/components/atoms/Message/Message";

export const SelectGoogleSheetForm = ({
  token = null,
  sheets = null,
  currentSheetId,
  onClick = console.log,
  ...props
}) => {
  if (!token) {
    return (
      <span className={styles.center}>
        <Message warning message="Please login into your Google account!" />
      </span>
    );
  }

  if (!sheets) {
    return (
      <span className={styles.center}>
        <Loading loading />
      </span>
    );
  }

  if (sheets.length === 0) {
    return <Message warning message="No sheets found!" />;
  }


  return (
    <Form {...props}>
      {sheets.map((sheet) => {
        return (
          <GoogleSheetCard
            isHover={true}
            selected={currentSheetId === sheet.id}
            onClick={() => onClick(sheet.id)}
            key={sheet.id}
            sheet={sheet}
          />
        );
      })}
    </Form>
  );
};
