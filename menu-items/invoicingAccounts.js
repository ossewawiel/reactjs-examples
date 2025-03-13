import { IconBriefcase, IconPoint } from '@tabler/icons-react';

const icons = {
  IconBriefcase,
  IconPoint,
};

const invoicingAccounts = {
  id: 'invoicing-accounts',
  title: 'Invoicing & Accounts',
  icon: icons.IconBriefcase,
  type: 'group',
  children: [
    // {
    //     id: 'chargeable-items',
    //     title: 'Chargeable Items',
    //     type: 'item',
    //     icon: icons.IconPoint
    // },
    {
      id: 'invoicing',
      title: 'Invoicing',
      type: 'item',
      url: '/information-centre/invoices',
      icon: icons.IconPoint,
    },
    // {
    //     id: 'optimus-financials',
    //     title: 'Optimus Financials',
    //     type: 'item',
    //     icon: icons.IconPoint
    // },
    {
      id: 'purchase-order-invoices',
      title: 'Purchase Invoices',
      type: 'item',
      url: '/information-centre/purchase-order-invoices',
      icon: icons.IconPoint,
    },
    // {
    //     id: 'invoicing-reports',
    //     title: 'Reports',
    //     type: 'collapse',
    //     icon: icons.IconPoint,
    //     children: [
    //         {
    //             id: 'print-invoices-report',
    //             title: 'Print Invoices',
    //             type: 'item',
    //             icon: icons.IconPoint
    //         },
    //         {
    //             id: 'chargeable-items-report',
    //             title: 'Chargeable Items',
    //             type: 'item',
    //             icon: icons.IconPoint
    //         }
    //     ]
    // }
    // {
    //     id: 'invoicing-reports',
    //     title: 'Reports',
    //     type: 'collapse',
    //     icon: icons.IconPoint,
    //     children: [
    //         {
    //             id: 'print-invoices-report',
    //             title: 'Print Invoices',
    //             type: 'item',
    //             icon: icons.IconPoint
    //         },
    //         {
    //             id: 'chargeable-items-report',
    //             title: 'Chargeable Items',
    //             type: 'item',
    //             icon: icons.IconPoint
    //         }
    //     ]
    // }
  ],
};

export default invoicingAccounts;
