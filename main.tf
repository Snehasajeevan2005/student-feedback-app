# ========================
# Variables
# ========================
variable "azure_credentials" {
  type        = string
  description = "Azure service principal credentials in JSON format"
}

# ========================
# Configure Azure Provider
# ========================
terraform {
  required_providers {
    azurerm = {
      source  = "hashicorp/azurerm"
      version = "~> 3.0"
    }
  }
  required_version = ">= 1.3.0"
}

provider "azurerm" {
  features {}

  # Parse JSON secret for authentication
  tenant_id       = jsondecode(var.azure_credentials)["tenantId"]
  subscription_id = jsondecode(var.azure_credentials)["subscriptionId"]
  client_id       = jsondecode(var.azure_credentials)["clientId"]
  client_secret   = jsondecode(var.azure_credentials)["clientSecret"]
}

# ========================
# Use Existing Resource Group
# ========================
data "azurerm_resource_group" "existing" {
  name = "sneha"  # Replace with your actual RG name
}

# ========================
# Reference Existing Cosmos DB
# ========================
data "azurerm_cosmosdb_account" "existing_cosmos" {
  name                = "YOUR_COSMOS_DB_NAME"  # Replace with your Cosmos DB name
  resource_group_name = data.azurerm_resource_group.existing.name
}

# ========================
# Placeholder AKS Resource Group (demo only)
# ========================
resource "azurerm_resource_group" "aks_demo_placeholder" {
  name     = "aks-demo-placeholder"
  location = data.azurerm_resource_group.existing.location
  tags = {
    environment = "demo"
  }
}

# ========================
# Outputs
# ========================
output "cosmos_endpoint" {
  value       = data.azurerm_cosmosdb_account.existing_cosmos.endpoint
  description = "cosmosdbac"
}

output "aks_demo_note" {
  value       = "AKS cluster cannot be created due to subscription policy; placeholder RG used for demo"
}
