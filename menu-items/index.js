import { generalDashboard, aiDashboard } from './dashboard';
import enquiriesQuotations from './enquiriesQuotations';
import jobProofTracking from './jobProofTracking';
import stockPurchasing from './stockPurchasing';
import dataflex from './dataflex';
import invoicingAccounts from './invoicingAccounts';

// ==============================|| MENU ITEMS ||============================== //

const menuItems = {
  items: [
    generalDashboard,
    aiDashboard,
    enquiriesQuotations,
    jobProofTracking,
    // productionControl,
    stockPurchasing,
    // dataCollection,
    invoicingAccounts,
    dataflex,
  ],
};

export default menuItems;
