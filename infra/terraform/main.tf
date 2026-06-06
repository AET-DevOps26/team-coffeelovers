data "azurerm_resource_group" "this" {
  name = var.resource_group_name
}

data "azurerm_virtual_network" "this" {
  name                = var.virtual_network_name
  resource_group_name = data.azurerm_resource_group.this.name
}

data "azurerm_subnet" "this" {
  name                 = var.subnet_name
  virtual_network_name = data.azurerm_virtual_network.this.name
  resource_group_name  = data.azurerm_resource_group.this.name
}

data "azurerm_network_interface" "this" {
  name                = var.network_interface_name
  resource_group_name = data.azurerm_resource_group.this.name
}

data "azurerm_virtual_machine" "this" {
  name                = var.vm_name
  resource_group_name = var.resource_group_name
}