output "resource_group_name" {
  description = "Existing resource group used by the deployment."
  value       = data.azurerm_resource_group.this.name
}

output "virtual_network_name" {
  description = "Existing virtual network name."
  value       = data.azurerm_virtual_network.this.name
}

output "subnet_name" {
  description = "Existing subnet name."
  value       = data.azurerm_subnet.this.name
}

output "network_interface_name" {
  description = "Existing network interface name."
  value       = data.azurerm_network_interface.this.name
}

output "vm_name" {
  description = "Existing VM name."
  value       = data.azurerm_linux_virtual_machine.this.name
}

output "public_ip_address" {
  description = "Public IP address of the VM."
  value       = var.public_ip_address
}

output "ssh_command" {
  description = "Example SSH command for connecting to the VM."
  value       = "ssh ${var.admin_username}@${var.public_ip_address}"
}