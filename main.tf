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
  name                = "cosmosdbac"  # replace with your actual Cosmos DB name
  resource_group_name = data.azurerm_resource_group.existing.name
}

# ========================
# AKS Cluster (plan-only demo)
# ========================
resource "azurerm_kubernetes_cluster" "aks_cluster" {
  name                = "myAKSCluster"
  location            = data.azurerm_resource_group.existing.location
  resource_group_name = data.azurerm_resource_group.existing.name
  dns_prefix          = "akscluster"

  default_node_pool {
    name       = "default"
    node_count = 2
    vm_size    = "Standard_DS2_v2"
  }

  identity {
    type = "SystemAssigned"
  }

  network_profile {
    network_plugin    = "azure"
    load_balancer_sku = "standard"
  }

  tags = {
    environment = "demo"
  }
}

# ========================
# Outputs for Demo
# ========================
output "kube_config" {
  value     = azurerm_kubernetes_cluster.aks_cluster.kube_config_raw
  sensitive = true
}

output "cosmos_endpoint" {
  value = data.azurerm_cosmosdb_account.existing_cosmos.endpoint
}
