import * as pulumi from "@pulumi/pulumi";
import * as azure from "@pulumi/azure-native";

const resourceGroupName = "gridlinks";
const storageAccountName = "profiles"; // Name should be unique across Azure

const resourceGroup = azure.resources.getResourceGroup({ resourceGroupName: resourceGroupName });

// Create a new storage account in the existing resource group.
const storageAccount = new azure.storage.StorageAccount(storageAccountName, {
    resourceGroupName: resourceGroup.then(rg => rg.name),  // Ensure the correct reference to the existing RG
    sku: {
        name: azure.storage.SkuName.Standard_LRS,  // locally redundant storage (LRS)
    },
    kind: azure.storage.Kind.StorageV2,
    location: resourceGroup.then(rg => rg.location),  // Use the location of the resource group
});

// Export the storage account name and connection string for reference.
export const accountName = storageAccount.name;
export const accountConnectionString = pulumi.all([storageAccount.name, resourceGroupName]).apply(([name, rgName]) =>
    azure.storage.listStorageAccountKeys({
        resourceGroupName: rgName,
        accountName: name
    }).then(keys => keys.keys[0].value)
);

