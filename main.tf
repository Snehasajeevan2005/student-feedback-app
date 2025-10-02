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
}

# ========================
# Use Existing Resource Group
# ========================
data "azurerm_resource_group" "existing" {
  name = "sneha"  # your existing RG
}

# ========================
# Reference Existing Cosmos DB
# ========================
data "azurerm_cosmosdb_account" "existing_cosmos" {
  name                = "cosmosdbac"  # replace with your Cosmos DB name
  resource_group_name = data.azurerm_resource_group.existing.name
}

# ========================
# Mock AKS Cluster (for plan/demo purposes only)
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
  description = "Existing Cosmos DB endpoint"
}

output "aks_demo_note" {
  value       = "AKS cluster cannot be created due to subscription policy; placeholder RG used for demo"
}
