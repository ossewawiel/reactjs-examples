import { IconBuildingWarehouse, IconPoint } from '@tabler/icons-react';

const icons = {
  IconBuildingWarehouse,
  IconPoint,
};

const stockPurchasing = {
  id: 'stock-purchasing',
  title: 'Stock & Purchasing',
  icon: icons.IconBuildingWarehouse,
  type: 'group',
  collapsable: true,
  children: [
    {
      id: 'stock',
      title: 'Stock',
      type: 'collapse',
      icon: icons.IconPoint,
      children: [
        {
          id: 'issues',
          title: 'Issues',
          type: 'item',
          url: '/information-centre/issues',
          icon: icons.IconPoint,
          permissions: ['ISS_VIEW'],
        },
        {
          id: 'material-outwork',
          title: 'Materials & Outwork',
          type: 'item',
          url: '/information-centre/materials-outwork',
          icon: icons.IconPoint,
          permissions: ['EDIT_VCODES'],
        },
        // {
        //     id: 'stock-adjustments',
        //     title: 'Stock Adjustments',
        //     type: 'item',
        //     url: '/underpressure',
        //     icon: icons.IconPoint,
        //     permissions: ['OH_VIEW', 'SOH_ADJ', 'REC_ADD'],
        //     breadcrumbs: false
        // }
      ],
    },
    {
      id: 'purchase-orders',
      title: 'Purchase Orders',
      type: 'item',
      url: '/information-centre/purchase-orders',
      icon: icons.IconPoint,
      permissions: ['PO_VIEW'],
    },
    {
      id: 'receipts',
      title: 'Receipts',
      type: 'item',
      url: '/information-centre/receipts',
      icon: icons.IconPoint,
      permissions: ['REC_VIEW'],
    },
    {
      id: 'requisitions',
      title: 'Requisitions',
      type: 'collapse',
      icon: icons.IconPoint,
      children: [
        {
          id: 'requisition-list',
          title: 'Requisitions',
          type: 'item',
          url: '/information-centre/requisitions',
          icon: icons.IconPoint,
          permissions: ['REQ_VIEW'],
        },
        // {
        //     id: 'requisitions-to-be-ordered',
        //     title: 'To be Ordered',
        //     type: 'item',
        //     url: '/underpressure',
        //     icon: icons.IconPoint,
        //     permissions: ['PO_VIEW'],
        //     breadcrumbs: false
        // }
      ],
    },
    {
      id: 'sales-orders',
      title: 'Sales Orders',
      type: 'collapse',
      icon: icons.IconPoint,
      children: [
        {
          id: 'sales-order-list',
          title: 'Sales Orders',
          type: 'item',
          url: '/information-centre/sales-orders',
          icon: icons.IconPoint,
          permissions: ['SO_VIEW'],
        },
        {
          id: 'sales-order-enquiry',
          title: 'S/O Enquiries',
          type: 'item',
          url: '/information-centre/sales-order-enquiries',
          icon: icons.IconPoint,
          permissions: ['SO_VIEW'],
        },
      ],
    },
    // {
    //     id: 'reports',
    //     title: 'Reports',
    //     type: 'item',
    //     url: '/underpressure',
    //     icon: icons.IconPoint,
    //     breadcrumbs: false
    // }
  ],
};

export default stockPurchasing;
