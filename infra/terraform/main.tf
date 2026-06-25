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

data "azurerm_network_security_group" "this" {
  name                = var.network_security_group_name
  resource_group_name = data.azurerm_resource_group.this.name
}

locals {
  azure_vm_application_ports = {
    client_web    = "3000"
    backend_api   = "8081"
    genai_service = "8001"
  }
}

resource "azurerm_network_security_rule" "azure_vm_application_ports" {
  for_each = local.azure_vm_application_ports

  name                        = "Allow-${each.key}"
  priority                    = 1300 + index(keys(local.azure_vm_application_ports), each.key)
  direction                   = "Inbound"
  access                      = "Allow"
  protocol                    = "Tcp"
  source_port_range           = "*"
  destination_port_range      = each.value
  source_address_prefix       = "*"
  destination_address_prefix  = "*"
  resource_group_name         = data.azurerm_resource_group.this.name
  network_security_group_name = data.azurerm_network_security_group.this.name
}