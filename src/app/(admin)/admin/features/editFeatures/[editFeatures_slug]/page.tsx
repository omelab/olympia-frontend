import React from 'react';

import CreateFeatures from '@/modules/admin/features/addFeatures';

function CreateFeaturespage({ params }: any) {
  return <CreateFeatures id={params?.editFeatures_slug} />;
}

export default CreateFeaturespage;
