import { getBusinessById } from "../model";

export const getBusinessHandler = (business_id: string) => {
  return getBusinessById(business_id);
};
