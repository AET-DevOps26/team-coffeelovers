output "resource_group_name" {
  description = "Existing resource group used by the deployment"
  value       = data.azurerm_resource_group.this.name
}

output "virtual_network_name" {
  description = "Existing virtual network name"
  value       = data.azurerm_virtual_network.this.name
}

output "subnet_name" {
  description = "Existing subnet name"
  value       = data.azurerm_subnet.this.name
}

output "network_interface_name" {
  description = "Existing network interface name"
  value       = data.azurerm_network_interface.this.name
}

output "vm_name" {
  description = "Existing VM name"
  value       = data.azurerm_linux_virtual_machine.this.name
}

output "vm_id" {
  description = "VM resource ID"
  value       = data.azurerm_linux_virtual_machine.this.id
}

output "public_ip_address" {
  description = "Public IP address of the VM"
  value       = var.public_ip_address
}

output "private_ip_address" {
  description = "Private IP address of the VM"
  value       = data.azurerm_network_interface.this.private_ip_addresses[0]
}

output "ssh_command" {
  description = "SSH command for connecting to the VM"
  value       = "ssh -i ~/.ssh/devops_key.pem ${var.admin_username}@${var.public_ip_address}"
}

output "application_urls" {
  description = "URLs to access deployed applications"
  value = {
    client_web       = "http://${var.public_ip_address}:3000"
    backend_api      = "http://${var.public_ip_address}:8081"
    genai_service    = "http://${var.public_ip_address}:8001"
    genai_health     = "http://${var.public_ip_address}:8001/health"
    postgres_connect = "postgresql://${var.admin_username}@${var.public_ip_address}:5432/coffeelovers"
  }
}
